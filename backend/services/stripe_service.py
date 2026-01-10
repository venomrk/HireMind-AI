import stripe
from config import get_settings

settings = get_settings()

if settings.stripe_secret_key:
    stripe.api_key = settings.stripe_secret_key

PLANS = {
    "free": {
        "name": "Free",
        "price": 0,
        "jobs_limit": 1,
        "resumes_limit": 50,
        "features": ["Basic AI parsing", "Manual emails"]
    },
    "pro": {
        "name": "Pro",
        "price": 99,
        "price_id": settings.stripe_price_pro,
        "jobs_limit": 5,
        "resumes_limit": 500,
        "features": ["Advanced AI ranking", "Automated emails", "Custom templates"]
    },
    "business": {
        "name": "Business",
        "price": 299,
        "price_id": settings.stripe_price_business,
        "jobs_limit": 20,
        "resumes_limit": -1,  # Unlimited
        "features": ["Unlimited resumes", "Team access", "ATS integration", "Priority support"]
    }
}

async def create_checkout_session(user_id: str, user_email: str, plan: str, success_url: str, cancel_url: str) -> str:
    """Create a Stripe Checkout session for subscription."""
    
    if plan not in PLANS or plan == "free":
        raise ValueError("Invalid plan selected")
    
    plan_info = PLANS[plan]
    
    try:
        session = stripe.checkout.Session.create(
            customer_email=user_email,
            payment_method_types=["card"],
            line_items=[{
                "price": plan_info["price_id"],
                "quantity": 1
            }],
            mode="subscription",
            success_url=success_url,
            cancel_url=cancel_url,
            metadata={"user_id": user_id, "plan": plan}
        )
        return session.url
    except Exception as e:
        print(f"Stripe error: {e}")
        raise

async def create_portal_session(customer_id: str, return_url: str) -> str:
    """Create a Stripe Customer Portal session."""
    
    try:
        session = stripe.billing_portal.Session.create(
            customer=customer_id,
            return_url=return_url
        )
        return session.url
    except Exception as e:
        print(f"Stripe portal error: {e}")
        raise

async def handle_webhook_event(payload: bytes, signature: str) -> dict:
    """Handle Stripe webhook events."""
    
    try:
        event = stripe.Webhook.construct_event(
            payload, signature, settings.stripe_webhook_secret
        )
    except ValueError:
        raise ValueError("Invalid payload")
    except stripe.error.SignatureVerificationError:
        raise ValueError("Invalid signature")
    
    return {
        "type": event["type"],
        "data": event["data"]["object"]
    }

def get_plan_limits(plan: str) -> dict:
    """Get the limits for a given plan."""
    return PLANS.get(plan, PLANS["free"])

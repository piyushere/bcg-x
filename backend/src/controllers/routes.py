from .electricity_applications import eappl_router
from fastapi import APIRouter

router = APIRouter()
router.include_router(eappl_router, prefix='/applications')

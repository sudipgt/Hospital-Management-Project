from rest_framework.routers import DefaultRouter
from .views import AppointmentViewSet, PrescriptionViewSet

router = DefaultRouter()
router.register(r'appointments', AppointmentViewSet, basename='appointments')
router.register(r'prescriptions', PrescriptionViewSet, basename='prescriptions')

urlpatterns = router.urls
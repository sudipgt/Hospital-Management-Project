from django.contrib import admin
from .models import DoctorProfile


@admin.register(DoctorProfile)
class DoctorProfileAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'specialization', 'qualification', 'experience_years', 'is_available')
    list_filter = ('specialization', 'is_available')
    search_fields = ('user__username', 'specialization')
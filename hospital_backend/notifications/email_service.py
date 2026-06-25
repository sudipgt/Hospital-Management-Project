from django.conf import settings
from django.core.mail import send_mail


def send_appointment_email(appointment):
    """
    Sends appointment confirmation email to patient.

    Important:
    Email failure should not break appointment booking.
    """

    if not settings.EMAIL_ENABLED:
        print("Email disabled. Skipping appointment email.")
        return False

    patient = appointment.patient

    if not patient.email:
        print("Patient email missing. Email not sent.")
        return False

    subject = "Appointment Confirmation - MediCare Hospital"

    message = (
        f"Dear {patient.name},\n\n"
        f"Your appointment has been booked successfully.\n\n"
        f"Appointment Details:\n"
        f"Doctor: Dr. {appointment.doctor.user.username}\n"
        f"Date: {appointment.appointment_date}\n"
        f"Time: {appointment.appointment_time}\n"
        f"Symptoms: {appointment.symptoms or 'N/A'}\n\n"
        f"Please arrive 15 minutes before your appointment time.\n\n"
        f"Thank you,\n"
        f"MediCare Hospital"
    )

    try:
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[patient.email],
            fail_silently=False,
        )

        print("Appointment email sent successfully.")
        return True

    except Exception as error:
        print("Appointment email failed:", error)
        return False
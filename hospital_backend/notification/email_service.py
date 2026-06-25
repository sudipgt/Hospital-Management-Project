from django.conf import settings
from django.core.mail import send_mail


def send_appointment_email(appointment):
    print("========== EMAIL FUNCTION STARTED ==========")

    if not settings.EMAIL_ENABLED:
        print("Email disabled. Skipping appointment email.")
        return False

    patient = appointment.patient

    print("Patient Name:", patient.name)
    print("Patient Email:", patient.email)
    print("Doctor:", appointment.doctor.user.username)

    if not patient.email:
        print("Patient email missing. Email not sent.")
        return False

    hospital_name = settings.HOSPITAL_NAME
    hospital_address = settings.HOSPITAL_ADDRESS
    hospital_contact = settings.HOSPITAL_CONTACT

    subject = f"Appointment Confirmation - {hospital_name}"

    message = (
        f"Dear {patient.name},\n\n"
        f"Your appointment has been booked successfully.\n\n"
        f"Appointment Details:\n"
        f"Doctor: Dr. {appointment.doctor.user.username}\n"
        f"Date: {appointment.appointment_date}\n"
        f"Time: {appointment.appointment_time}\n"
        f"Symptoms: {appointment.symptoms or 'N/A'}\n\n"
        f"Hospital Details:\n"
        f"Hospital: {hospital_name}\n"
        f"Address: {hospital_address}\n"
        f"Contact: {hospital_contact}\n\n"
        f"Please arrive 15 minutes before your appointment time.\n\n"
        f"Thank you,\n"
        f"{hospital_name}"
    )

    print("=========== EMAIL MESSAGE ===========")
    print(message)
    print("====================================")

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
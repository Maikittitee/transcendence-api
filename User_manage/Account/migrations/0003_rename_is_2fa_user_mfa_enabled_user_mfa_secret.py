# Generated by Django 4.2.5 on 2024-11-07 08:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("Account", "0002_user_is_2fa"),
    ]

    operations = [
        migrations.RenameField(
            model_name="user",
            old_name="is_2fa",
            new_name="mfa_enabled",
        ),
        migrations.AddField(
            model_name="user",
            name="mfa_secret",
            field=models.CharField(blank=True, max_length=16, null=True),
        ),
    ]
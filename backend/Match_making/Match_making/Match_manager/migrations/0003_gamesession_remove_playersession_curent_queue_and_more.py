# Generated by Django 4.2.16 on 2024-11-24 13:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Match_manager', '0002_playersession_channels_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='GameSession',
            fields=[
                ('game_id', models.UUIDField(primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('status', models.CharField(default='waiting', max_length=20)),
                ('max_players', models.IntegerField(default=2)),
            ],
        ),
        migrations.RemoveField(
            model_name='playersession',
            name='curent_queue',
        ),
        migrations.AlterField(
            model_name='playersession',
            name='channels_name',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='playersession',
            name='current_status',
            field=models.CharField(default='idle', max_length=20),
        ),
        migrations.AlterModelTable(
            name='playersession',
            table='player_sessions',
        ),
        migrations.DeleteModel(
            name='QueueSession',
        ),
        migrations.AddField(
            model_name='gamesession',
            name='players',
            field=models.ManyToManyField(blank=True, related_name='participated_games', to='Match_manager.playersession'),
        ),
        migrations.AddField(
            model_name='playersession',
            name='current_game',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='current_players', to='Match_manager.gamesession'),
        ),
    ]
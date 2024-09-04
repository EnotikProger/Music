from django.db import models

# Create your models here.
class ImportantInfo(models.Model):
    music_author = models.CharField(max_length=255)
    lyrics_author = models.CharField(max_length=255)
    isrc = models.CharField(max_length=12, unique=True)
    upc = models.CharField(max_length=12, unique=True)
    lyrics = models.TextField()

    def __str__(self):
        return f"{self.music_author} / {self.lyrics_author} - {self.isrc}"
    
class User(models.Model):
    name = 'default'
    def __str__(self):
        return f"{self.name}"

class MusicRelease(models.Model):
    SINGLE = 'S'
    ALBUM = 'A'
    RELEASE_TYPE_CHOICES = [
        (SINGLE, 'Single'),
        (ALBUM, 'Album'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    release_type = models.CharField(max_length=1, choices=RELEASE_TYPE_CHOICES)
    genre = models.CharField(max_length=255)
    cover_image = models.ImageField(upload_to='covers/')
    artist = models.CharField(max_length=255)
    album_title = models.CharField(max_length=255, blank=True, default='')
    release_date = models.DateField()
    tiktok_release_date = models.DateField()
  

    def __str__(self):
        return f"{self.artist} - {self.album_title or 'Single'}"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.release_type == self.SINGLE:
            if self.tracks.count() != 1:
                raise ValueError('У сингла должен быть только один трек.')
        elif self.release_type == self.ALBUM:
            if self.tracks.count() < 2:
                raise ValueError('У альбома должно быть больше одного трека.')

class Track(models.Model):
    title = models.CharField(max_length=255)
    wav_file = models.FileField(upload_to='tracks/')
    important_info = models.OneToOneField(ImportantInfo, on_delete=models.CASCADE)
    music_release = models.ForeignKey(MusicRelease, related_name='tracks', on_delete=models.CASCADE)

    def __str__(self):
        return self.title
    
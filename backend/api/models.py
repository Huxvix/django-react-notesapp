from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes')
    # ForeignKey User modeline bağlanıyor, on_delete=models.CASCADE ile user silinirse notlar da silinir.
    # related_name ile user üzerinden notlara erişim sağlanabilir.

    def __str__(self):
        return self.title
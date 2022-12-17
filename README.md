# Pagawe

Merupakan platform berbasis web application yang menampung segala
curahan hati para pegawai perusahaan. Dengan begitu atasan
dapat menilai kesehatan mental para pegawainya. Karena mental sangat
memengaruhi kinerja bisnis perusahaan. Pegawai Sehat, Bisnis Pun Sehat!

### Teknologi

- MongoDB
- Express
- React (Vite)
- NodeJS

### Eksekusi

Run server, pada terminal folder server jalankan perintah berikut:

```bash
node app
```

### Halaman

- `/`: Landing page berisi cuitan-cuitan yang bersifat publik
- `/user`: User dapat melihat cuitan, info, unggah cuitan serta hapus cuitan pada akun mereka
- `/admin`: Admin dapat melihat tabel akun user
- `/formuser/new`: Admin menambahkan user baru
- `/formuser/userid`: Admin dapat edit info akun dan edit visibilitas cuitan user
- `login`: portal login bagi kedua role (admin, user)

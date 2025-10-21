document.addEventListener('DOMContentLoaded', () => {
    
    //pada service.html
    const form = document.getElementById('formService');

    if(form){
        form.addEventListener('submit', function(e){
            e.preventDefault();

            const data = {
                nama: document.getElementById('nama').value,
                email: document.getElementById('email').value,
                layanan: document.getElementById('layanan').value
            };

            //nyimpan data awal di lokal
            localStorage.setItem('serviceData', JSON.stringify(data));

            //pindah ke halaman satunya
            window.location.href = 'service1.html';
        });
    }

    //pada service1.html
    const form1 = document.getElementById('formService1');
    const infoDiv =document.getElementById('infoPelanggan');

    if(form1 && infoDiv){
        //ambil data dari lokal
        const rawData = localStorage.getItem('serviceData');

        if (rawData){
            const data = JSON.parse(rawData);

            //menampilkan datanya
            infoDiv.innerHTML =`
            <p><span class="data-label">Nama:</span> ${data.nama}</p>
            <p><span class="data-label">Email:</span> ${data.email}</p>
            <p><span class="data-label">Produk:</span> ${data.produk}</p>`;

            form1.addEventListener('submit', function(e){
                e.preventDefault();

                const finalData = {
                    ...data,
                    keluhan: document.getElementById('keluhan').value,
                    saran: document.getElementById('saran').value,
                    kritik: document.getElementById('kritik').value
                };

                //hapus data sementara di lokal
                localStorage.removeItem('serviceData');
                //pengiriman data
                console.log('Data Final diterima siap dikirim:', finalData);
                alert('Terima kasih! Kami terima dan kami proses secepatnya.');
                //kembali ke home
                window.location.href='index.html';
            });
        }else{
            //jika tidak ada data di lokal maka kembali
            infoDiv.innerHTML = `<p style="color: red;">Kesalahan: Data pelanggan tidak ditemukan. Silakan <a href="layanan1.html">kembali ke langkah 1</a>.</p>`;
            form1.style.display = 'none';
        }
    }

});

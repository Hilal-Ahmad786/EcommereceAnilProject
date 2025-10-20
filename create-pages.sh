#!/bin/bash

mkdir -p src/app/\(main\)/hesabim/siparisler/\{orderId\} \
         src/app/\(main\)/hesabim/adresler \
         src/app/\(main\)/hesabim/profil \
         src/app/\(main\)/blog/\{slug\}

touch src/app/\(auth\)/sifre-sifirlama/page.tsx \
      src/app/\(main\)/favoriler/page.tsx \
      src/app/\(main\)/hakkimizda/page.tsx \
      src/app/\(main\)/iletisim/page.tsx \
      src/app/\(main\)/kargo-iade/page.tsx \
      src/app/\(main\)/gizlilik-politikasi/page.tsx \
      src/app/\(main\)/kullanim-kosullari/page.tsx \
      src/app/\(main\)/hesabim/page.tsx \
      src/app/\(main\)/hesabim/siparisler/page.tsx \
      src/app/\(main\)/hesabim/siparisler/\{orderId\}/page.tsx \
      src/app/\(main\)/hesabim/adresler/page.tsx \
      src/app/\(main\)/hesabim/profil/page.tsx \
      src/app/\(main\)/blog/page.tsx \
      src/app/\(main\)/blog/\{slug\}/page.tsx

echo "✅ All missing page folders and files created!"


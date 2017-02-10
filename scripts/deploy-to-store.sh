
ionic build android --release 
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore carrinhodecompras-key.keystore ./platforms/android/build/outputs/apk/android-release-unsigned.apk carrinhodecompraskeyandroid
rm ./platforms/android/build/outputs/apk/carrinhodecompras.apk
zipalign -v 4 ./platforms/android/build/outputs/apk/android-release-unsigned.apk ./platforms/android/build/outputs/apk/carrinhodecompras.apk
cd ./platforms/android/build/outputs/apk/
nautilus .

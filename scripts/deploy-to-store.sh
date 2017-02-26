# cordova plugin remove cordova-plugin-crosswalk-webview

# minSDK 19
# ionic build android --release
# jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore carrinhodecompras-key.keystore ./platforms/android/build/outputs/apk/android-release-unsigned.apk carrinhodecompraskeyandroid
# rm ./platforms/android/build/outputs/apk/carrinhodecompras.apk
# zipalign -v 4 ./platforms/android/build/outputs/apk/android-release-unsigned.apk ./platforms/android/build/outputs/apk/carrinhodecompras.apk
# cd ./platforms/android/build/outputs/apk/
# nautilus .



# Com Crosswalk ativo!!
# minSDK 16
ionic build android --release

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore carrinhodecompras-key.keystore ./platforms/android/build/outputs/apk/android-armv7-release-unsigned.apk carrinhodecompraskeyandroid
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore carrinhodecompras-key.keystore ./platforms/android/build/outputs/apk/android-x86-release-unsigned.apk carrinhodecompraskeyandroid

zipalign -v 4 ./platforms/android/build/outputs/apk/android-armv7-release-unsigned.apk ./platforms/android/build/outputs/apk/carrinhodecompras-armv7.apk
zipalign -v 4 ./platforms/android/build/outputs/apk/android-x86-release-unsigned.apk ./platforms/android/build/outputs/apk/carrinhodecompras-x86.apk

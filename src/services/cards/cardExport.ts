import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import type { RefObject } from 'react';
import type { View } from 'react-native';
import { captureRef } from 'react-native-view-shot';

export async function captureCardImage(viewRef: RefObject<View | null>): Promise<string> {
  return captureRef(viewRef, { format: 'png', quality: 1, result: 'tmpfile' });
}

export async function shareCardImage(viewRef: RefObject<View | null>) {
  const uri = await captureCardImage(viewRef);
  const canShare = await Sharing.isAvailableAsync();
  if (canShare) {
    await Sharing.shareAsync(uri, { mimeType: 'image/png', dialogTitle: 'Partager la carte' });
  }
  return uri;
}

export async function exportCardAsPdf(viewRef: RefObject<View | null>) {
  const imageUri = await captureCardImage(viewRef);
  const base64 = await FileSystem.readAsStringAsync(imageUri, { encoding: FileSystem.EncodingType.Base64 });
  const html = `
    <html>
      <body style="margin:0;display:flex;align-items:center;justify-content:center;">
        <img src="data:image/png;base64,${base64}" style="width:100%;height:auto;" />
      </body>
    </html>
  `;
  const { uri } = await Print.printToFileAsync({ html });
  const canShare = await Sharing.isAvailableAsync();
  if (canShare) {
    await Sharing.shareAsync(uri, { mimeType: 'application/pdf', dialogTitle: 'Partager la carte en PDF' });
  }
  return uri;
}

import {useEffect} from 'react';
import {Platform} from 'react-native';
import FaceSDK, {
  Enum,
  FaceCaptureResponse,
  LivenessResponse,
  MatchFacesResponse,
  MatchFacesRequest,
  MatchFacesImage,
  ComparedFacesSplit,
  InitConfig,
  InitResponse,
  LivenessSkipStep,
  SearchPerson,
  RNFaceApi,
  LivenessNotification,
} from '@regulaforensics/react-native-face-api';
import * as RNFS from 'react-native-fs';

export const useFaceCapture = () => {
  useEffect(() => {
    const licPath =
      Platform.OS === 'ios'
        ? RNFS.MainBundlePath + '/regula.license'
        : 'regula.license';
    const readFile =
      Platform.OS === 'ios' ? RNFS.readFile : RNFS.readFileAssets;
    RNFS.exists(licPath).then(() => {
      readFile(licPath, 'base64')
        .then(license => {
          const config = new InitConfig();
          config.license = license;
          console.log('config', config);
          FaceSDK.initialize(null, initFaceSdk, (_e: any) => {});
        })
        .catch(_ => {
          console.log('license error');
        });
    });
  });

  const initFaceSdk = (json: string) => {
    var response = InitResponse.fromJson(JSON.parse(json));
    console.log('response', response);
    if (!response!.success) {
      console.log(response!.error!.code);
      console.log(response!.error!.message);
    } else {
      console.log('Init complete');
    }
  };

  const openLiveness = () => {
    FaceSDK.startLiveness(
      {skipStep: [LivenessSkipStep.ONBOARDING_STEP]},
      (json: string) => {
        var response = LivenessResponse.fromJson(JSON.parse(json))!;
        console.log(response);
      },
      _e => {},
    );
  };

  return {openLiveness};
};

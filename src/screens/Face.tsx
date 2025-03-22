import {View, Text, TouchableOpacity} from 'react-native';
import {useFaceCapture} from '../hooks/useFaceCapture';

export default function Face(props: any) {
  const {openLiveness} = useFaceCapture();

  return (
    <View style={{margin: 100}}>
      <TouchableOpacity
        style={{padding: 10, backgroundColor: 'red'}}
        onPress={openLiveness}>
        <Text style={{textAlign: 'center', color: 'white'}}>Open Liveness</Text>
      </TouchableOpacity>
    </View>
  );
}

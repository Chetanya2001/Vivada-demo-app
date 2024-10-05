import React, {useMemo} from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Svg, { G, Path, Circle } from "react-native-svg";
import { COUNTRIES } from '../constants/countryshapes';
const Map = (props:any) => {
    const { width, height } = Dimensions.get('window');
    const mapextent = useMemo(() => {
        return width > height / 2 ? height / 2 : width;
    },[width,height]);
    return (
       <View>
          <Text>Our Map</Text>
       </View>
    );
 };
 const styles = StyleSheet.create({});
 export default Map;
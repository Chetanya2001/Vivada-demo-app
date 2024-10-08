import React, { useState, useEffect, useMemo } from 'react';
import { View } from 'react-native';
import Svg, { G, Path, Circle } from 'react-native-svg';
import * as d3 from 'd3';
import { COUNTRIES } from '../constants/countryshapes';

interface MapProps {
  dimensions: {
    width: number;
    height: number;
  };
}

interface CountryFeature extends GeoJSON.Feature<GeoJSON.Geometry> {
  properties: {
    name: string;
  };
}

const Map: React.FC<MapProps> = ({ dimensions }) => {
  const [countryList, setCountryList] = useState<JSX.Element[]>([]);

  const mapExtent = useMemo(() => {
    return dimensions.width > dimensions.height / 2
      ? dimensions.height / 2
      : dimensions.width;
  }, [dimensions]);

  const countryPaths = useMemo(() => {
    const projection = d3
      .geoAzimuthalEqualArea()
      .rotate([0, -90])
      .clipAngle(150)
      .fitSize([mapExtent, mapExtent], {
        type: 'FeatureCollection',
        features: COUNTRIES,
      })
      .translate([dimensions.width / 2, mapExtent / 2]);

    const geoPath = d3.geoPath().projection(projection);

    const svgPaths = COUNTRIES.map((country: CountryFeature) => geoPath(country));
    return svgPaths;
  }, [dimensions]);

  useEffect(() => {
    setCountryList(
      countryPaths.map((path: string | null | undefined, i: number) => {
        return (
          <Path
            key={COUNTRIES[i].properties.name}
            d={path || ''}
            stroke={'#aaa'}
            strokeOpacity={0.3}
            strokeWidth={0.6}
            fill={'#aaa'}
            opacity={0.4}
          />
        );
      })
    );
  }, [countryPaths]);

  return (
    <View>
      <Svg width={dimensions.width} height={dimensions.height / 2}>
        <G>
          <Circle
            cx={dimensions.width / 2}
            cy={mapExtent / 2}
            r={mapExtent / 2}
            fill={'#3b454f'}
          />
          {countryList.map((country) => country)}
        </G>
      </Svg>
    </View>
  );
};

export default Map;

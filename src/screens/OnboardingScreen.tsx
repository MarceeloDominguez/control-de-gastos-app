import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Animated,
  Text,
  TouchableOpacity,
} from "react-native";
import { Color } from "../constants/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ONBOARDING } from "../data/onboarding";
import ButtonSkip from "../components/ButtonSkip";
import RenderItemOnboarding from "../components/RenderItemOnboarding";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../navigation/Navigation";

const { width } = Dimensions.get("window");

const ITEM_WIDTH = width;

export default function OnboardingScreen() {
  const { top } = useSafeAreaInsets();
  const [index, setIndex] = useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const ref = useRef<ScrollView | null>(null);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  return (
    <ScrollView style={[styles.container, { marginTop: top }]}>
      {index === ONBOARDING.length - 1 ? (
        <View style={styles.spaceButtonSkip} />
      ) : (
        <ButtonSkip />
      )}
      <View>
        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToInterval={ITEM_WIDTH}
          decelerationRate="fast"
          ref={ref}
          onMomentumScrollEnd={(e) => {
            setIndex(Math.round(e.nativeEvent.contentOffset.x / ITEM_WIDTH));
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          style={{ height: 550 }}
        >
          {ONBOARDING.map((item) => {
            return (
              <RenderItemOnboarding key={item.title} onboardingItem={item} />
            );
          })}
        </Animated.ScrollView>
        <View style={styles.contentDots}>
          {ONBOARDING.map((_, index) => {
            return <View key={index} style={styles.dot} />;
          })}
          <Animated.View
            style={[
              styles.dotSelected,
              {
                transform: [
                  {
                    translateX: Animated.divide(
                      scrollX,
                      ITEM_WIDTH
                    ).interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 16],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.contentButtonNext}
        onPress={() => {
          ref.current?.scrollTo({
            x: (index + 1) * ITEM_WIDTH,
            animated: true,
          });
          setIndex(index + 1);

          index === ONBOARDING.length - 1 && navigation.navigate("HomeScreen");

          index === ONBOARDING.length - 1 && setIndex(ONBOARDING.length - 1);
        }}
      >
        <Text style={styles.textNext}>Siguiente</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.primary,
    paddingVertical: 20,
  },
  contentDots: {
    flexDirection: "row",
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: "#D9D9D9",
    marginRight: 8,
  },
  dotSelected: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: "#956EDB",
    position: "absolute",
  },
  spaceButtonSkip: {
    width: 100,
    height: 50,
  },
  contentButtonNext: {
    backgroundColor: "#956EDB",
    marginTop: 50,
    marginHorizontal: 22,
    padding: 14,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  textNext: {
    fontSize: 18,
    fontFamily: "ConcertOne-Regular",
    letterSpacing: 0.3,
    color: Color.primary,
  },
});

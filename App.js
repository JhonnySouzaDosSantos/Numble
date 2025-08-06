import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList, TouchableOpacity  } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.numerosAd}>

      </View>

      <View style={styles.botoes}>
        <View style={styles.botoesA}>
          <TouchableOpacity style={styles.nums}><Text style={styles.num}>0</Text></TouchableOpacity >
          <TouchableOpacity style={styles.nums}><Text style={styles.num}>1</Text></TouchableOpacity >
          <TouchableOpacity style={styles.nums}><Text style={styles.num}>2</Text></TouchableOpacity >
          <TouchableOpacity style={styles.nums}><Text style={styles.num}>3</Text></TouchableOpacity >
          <TouchableOpacity style={styles.nums}><Text style={styles.num}>4</Text></TouchableOpacity > 
        </View>

        <View style={styles.botoesB}>
          <TouchableOpacity style={styles.nums}><Text style={styles.num}>5</Text></TouchableOpacity >
          <TouchableOpacity style={styles.nums}><Text style={styles.num}>6</Text></TouchableOpacity >
          <TouchableOpacity style={styles.nums}><Text style={styles.num}>7</Text></TouchableOpacity >
          <TouchableOpacity style={styles.nums}><Text style={styles.num}>8</Text></TouchableOpacity >
          <TouchableOpacity style={styles.nums}><Text style={styles.num}>9</Text></TouchableOpacity >
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
  },

  numerosAd: {
    flex: 0.6,
    borderWidth: 1,
    width: "100%",
  },

  botoes: {
    flex: 0.24,
    borderWidth: 1,
    width: "100%",
    flexDirection: "collumn",
    justifyContent: "space-between",
    alignItems: "center",
  },

  botoesA: {
    height: "50%",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 5,
  },

  botoesB: {
    height: "50%",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },

  nums: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
    height: "50%",
    borderRadius: 10,
    backgroundColor: "#595858",
    shadowColor: "#000",  // Shadow color
    shadowOffset: { width: 1, height: 5 },  // Offset of shadow
    shadowOpacity: 0.1,  // Opacity of shadow
    shadowRadius: 1,  // Radius for blur effect
    // Shadow for Android
    elevation: 10,
  },

  num: {
    color: "white",
    fontSize: 20,
  },
});

import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, FlatList, Pressable  } from "react-native";

export default function App() {
  const [aut, setAut] = useState(Array(12).fill(0)); 

  const clicar=(i)=>{ 
    const newAut = [...aut]; 
    newAut[i] = 10;          
    setAut(newAut);
  }
  const segurar=(i)=>{ 
    const newAut = [...aut]; 
    newAut[i] = 10;          
    setAut(newAut);
  }
  const soltar=(i)=>{ 
    const newAut = [...aut]; 
    newAut[i] = 0;          
    setAut(newAut);
  }

  const dados = [
    {id: '1', nome: 'joao'},
    {id: '2', nome: 'joao'},
    {id: '3', nome: 'joao'},
  ]
  
  return (
    <View style={styles.container}>
      <View style={styles.numerosAd}>
        <FlatList
          data={dados}
          renderItem={({item, index}) => (
            <Pressable style={styles.adv}><Text>{index + 1}</Text></Pressable>
          )}
          keyExtractor={(item) => item.id}
          />
      </View>

      <View style={styles.botoes}>
        <View style={styles.botoesA}>
        <Pressable style={[styles.nums, { top: aut[0] }]} onPressIn={() => clicar(0)} onLongPress={() => segurar(0)} onPressOut={() => soltar(0)}>
          <Text style={styles.num}>0</Text>
        </Pressable>
        <Pressable style={[styles.nums, { top: aut[1] }]} onPressIn={() => clicar(1)} onLongPress={() => segurar(1)} onPressOut={() => soltar(1)}>
          <Text style={styles.num}>1</Text>
        </Pressable>
        <Pressable style={[styles.nums, { top: aut[2] }]} onPressIn={() => clicar(2)} onLongPress={() => segurar(2)} onPressOut={() => soltar(2)}>
          <Text style={styles.num}>2</Text>
        </Pressable>
        <Pressable style={[styles.nums, { top: aut[3] }]} onPressIn={() => clicar(3)} onLongPress={() => segurar(3)} onPressOut={() => soltar(3)}>
          <Text style={styles.num}>3</Text>
        </Pressable>
        <Pressable style={[styles.nums, { top: aut[4] }]} onPressIn={() => clicar(4)} onLongPress={() => segurar(4)} onPressOut={() => soltar(4)}>
          <Text style={styles.num}>4</Text>
        </Pressable>
        <Pressable style={[styles.nums, { backgroundColor: '#36B300', width: '25%', top: aut[5] }]} onPressIn={() => clicar(5)} onLongPress={() => segurar(5)} onPressOut={() => soltar(5)}>
          <Text style={styles.num}>✔</Text>
        </Pressable>
      </View>

      {/* Segundo grupo de botões */}
      <View style={styles.botoesB}>
        <Pressable style={[styles.nums, { top: aut[6] }]} onPressIn={() => clicar(6)} onLongPress={() => segurar(6)} onPressOut={() => soltar(6)}>
          <Text style={styles.num}>5</Text>
        </Pressable>
        <Pressable style={[styles.nums, { top: aut[7] }]} onPressIn={() => clicar(7)} onLongPress={() => segurar(7)} onPressOut={() => soltar(7)}>
          <Text style={styles.num}>6</Text>
        </Pressable>
        <Pressable style={[styles.nums, { top: aut[8] }]} onPressIn={() => clicar(8)} onLongPress={() => segurar(8)} onPressOut={() => soltar(8)}>
          <Text style={styles.num}>7</Text>
        </Pressable>
        <Pressable style={[styles.nums, { top: aut[9] }]} onPressIn={() => clicar(9)} onLongPress={() => segurar(9)} onPressOut={() => soltar(9)}>
          <Text style={styles.num}>8</Text>
        </Pressable>
        <Pressable style={[styles.nums, { top: aut[10] }]} onPressIn={() => clicar(10)} onLongPress={() => segurar(10)} onPressOut={() => soltar(10)}>
          <Text style={styles.num}>9</Text>
        </Pressable>
        <Pressable style={[styles.nums, { backgroundColor: '#94000C', width: '25%', top: aut[11] }]} onPressIn={() => clicar(11)} onLongPress={() => segurar(11)} onPressOut={() => soltar(11)}>
          <Text style={styles.num}>X</Text>
        </Pressable>
        </View>
      </View>
      <StatusBar style="auto" hidden={true} />
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
    top: "5%",
    flex: 0.6,
    borderWidth: 1,
    width: "90%",
  },

  adv: {
    height: '20%',
    width: '20%',
    borderWidth: 5,

  },

  botoes: {
    flex: 0.24,
    width: "100%",
    flexDirection: "collumn",
    alignItems: "center",
  },

  botoesA: {
    height: "40%",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
  },

  botoesB: {
    height: "40%",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
  },

  nums: {
    width: "28%",
    alignItems: "center",
    justifyContent: "center",
    height: "70%",
    borderRadius: 10,
    backgroundColor: "#B5B5B5",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 10,
    borderWidth: 3,
    borderColor: "black",
    
  },

  num: {
    color: "white",
    fontSize: 30,
  },

  
});

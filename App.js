import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Pressable, Dimensions } from "react-native";

export default function App() {
  const [aut, setAut] = useState(Array(12).fill(0));
  const [mud, setMud] = useState(Array(20).fill("#191D32"));
  const [bord, setBord] = useState(Array(20).fill(Dimensions.get("window").width * 0.008));


  const [numeros, setNumeros] = useState(
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      temp: 0,
      valor: 0,
      texto: "",
    }))
  );

  const pegar = (a) => {
    setNumeros((prev) => {
      const copia = [...prev];
      for (let i = 0; i < copia.length; i++) {
        if (copia[i].temp === 0) {
          copia[i] = {
            ...copia[i],
            temp: 1,
            valor: 1,
            texto: a.toString(),
          };
          break;
        }
      }
      return copia;
    });
  };

  const deletar = () => {
    setNumeros((prev) => {
      const copia = [...prev];
      const achar = copia.map(item => item.temp).lastIndexOf(1);

      if (achar !== -1) {
        copia[achar] = {
          ...copia[achar],
          temp: 0,
          valor: 0,
          texto: "",
        };
      }
      return copia;
    });
  };

  const confirmar = () => {

  }


  useEffect(() => {
    const newMud = Array(numeros.length).fill("#191D32");
    const newBord = Array(numeros.length).fill(Dimensions.get("window").width * 0.008);
    const achar = numeros.findIndex(item => item.temp === 0);
    if (achar != -1) {
      newMud[achar] = "#282F44";
      newBord[achar] = Dimensions.get("window").width * 0.015;
    }
    setMud(newMud);
    setBord(newBord);
  }, [numeros]);

  const clicar = (i) => {
    const newAut = [...aut];
    newAut[i] = 6;
    setAut(newAut);
  };
  const segurar = (i) => {
    const newAut = [...aut];
    newAut[i] = 6;
    setAut(newAut);
  };
  const soltar = (i) => {
    const newAut = [...aut];
    newAut[i] = 0;
    setAut(newAut);
  };

  const bot = [
    { id: "7", type: "number" },
    { id: "8", type: "number" },
    { id: "9", type: "number" },
    { id: "4", type: "number" },
    { id: "5", type: "number" },
    { id: "6", type: "number" },
    { id: "1", type: "number" },
    { id: "2", type: "number" },
    { id: "3", type: "number" },
    { id: "⌫", type: "delete" },
    { id: "0", type: "number" },
    { id: "✓", type: "confirm" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.numerosAd}>
        <FlatList
          style={styles.flatlist}
          data={numeros}
          numColumns={4}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.bera}>
                <Pressable
                  style={[
                    styles.adv,
                    { borderColor: mud[index], borderWidth: bord[index], },
                  ]}
                >
                  <Text style={styles.texto1}>{item.texto}</Text>
                </Pressable>
              </View>
            );
          }}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>

      <View style={styles.botoes}>
        <View style={styles.botoesA}>
          <FlatList
            style={styles.flatlist}
            data={bot}
            numColumns={3}
            renderItem={({ item, index }) => (
              <View style={styles.bot}>
                <Pressable
                  style={[
                    styles.num,
                    item.type === "delete" && styles.deleteButton,
                    item.type === "confirm" && styles.confirmButton,
                    { top: aut[index] },
                  ]}
                  onPress={() => {
                    if (item.type === "delete") {
                      deletar();
                    } else if (item.type === "confirm") {
                      confirmar();
                    }
                    else {
                      pegar(item.id);
                    }
                  }}
                  onPressIn={() => clicar(index)}
                  onLongPress={() => segurar(index)}
                  onPressOut={() => soltar(index)}
                >
                  <Text style={styles.numText}>{item.id}</Text>
                </Pressable>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
      <StatusBar style="auto" hidden={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0FBFC",
    alignItems: "center",
    justifyContent: "space-between",
  },

  bera: {
    flex: 1,
    aspectRatio: 1,
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
    marginVertical: 5,
  },

  deleteButton: {
    backgroundColor: "#8B0000",
    borderColor: "#FF0000",
  },

  confirmButton: {
    backgroundColor: "#006400",
    borderColor: "#00FF00",
  },

  numerosAd: {
    top: "5%",
    flex: 0.53,
    width: "90%",
  },

  adv: {
    height: "100%",
    width: "100%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  flatlist: {
    width: "100%",
    flex: 1,
    padding: "7%",
    paddingBottom: "15%",
  },

  botoes: {
    flex: 0.4,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: "3%",
  },

  botoesA: {
    width: "70%",
  },

  bot: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  num: {
    width: "90%",
    height: "90%",
    borderRadius: 15,
    backgroundColor: "#3C896D",
    justifyContent: "center",
    alignItems: "center",
  },

  numText: {
    fontSize: Dimensions.get("window").width * 0.07,
    color: "white",
    fontWeight: "600",
    textAlignVertical: "center",
  },

  texto1: {
    fontSize: Dimensions.get("window").width * 0.07,
    color: "#252627",
    fontWeight: "600",
    textAlignVertical: "center",
    textAlign: "center"
  }
});

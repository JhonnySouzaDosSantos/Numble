import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Pressable, Dimensions, Alert } from "react-native";

const gerarCodigoSecreto = () => {
  const numeros = [];
  while (numeros.length < 4) {
    const n = Math.floor(Math.random() * 10);
    if (!numeros.includes(n)) {
      numeros.push(n);
    }
  }
  return numeros;
};

export default function App() {
  const [aut, setAut] = useState(Array(12).fill(0));
  const [b1, setB1] = useState(Array(12).fill(Dimensions.get("window").width * 0.015));
  const [mud, setMud] = useState(Array(20).fill("#191D32"));
  const [bord, setBord] = useState(Array(20).fill(Dimensions.get("window").width * 0.008));
  const [op, setOp] = useState(Array(20).fill("#191D32"));
  const [liberados, setLiberados] = useState(4);
  const [codigoSecreto, setCodigoSecreto] = useState(gerarCodigoSecreto());
  const [feedback, setFeedback] = useState(Array(20).fill(null));

  const [numeros, setNumeros] = useState(
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      temp: 0,
      valor: 0,
      texto: "",
      md: 0,
    }))
  );


  const getCorTexto = (index) => {

    if (numeros[index].md === 1 && feedback[index] === null && numeros[index].texto !== "") {
      return "white";
    }
    return "#252627"; 
  };


  const getCorFundo = (index) => {
    if (feedback[index] === 'verde') return '#4CAF50';  
    if (feedback[index] === 'amarelo') return '#FFEB3B'; 
    if (numeros[index].md === 1) return '#191D32';
    if (index >= liberados - 4 && index < liberados) return 'white'; 
    return '#121212'; 
  };

  const pegar = (a) => {
    setNumeros((prev) => {
      const copia = [...prev];
      for (let i = liberados - 4; i < liberados; i++) {
        if (copia[i].temp === 0 && copia[i].md === 0) {
          copia[i] = {
            ...copia[i],
            temp: 1,
            valor: parseInt(a),
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
      for (let i = liberados - 1; i >= liberados - 4; i--) {
        if (copia[i].temp === 1 && copia[i].md === 0) {
          copia[i] = {
            ...copia[i],
            temp: 0,
            valor: 0,
            texto: "",
          };
          break;
        }
      }
      return copia;
    });
  };

  const reiniciarJogo = () => {
    setCodigoSecreto(gerarCodigoSecreto());
    setNumeros(Array.from({ length: 20 }, (_, i) => ({
      id: i,
      temp: 0,
      valor: 0,
      texto: "",
      md: 0,
    })));
    setFeedback(Array(20).fill(null));
    setLiberados(4);
  };

  const calcularFeedback = (tentativa) => {
    const novoFeedback = Array(4).fill(null);
    const codigoRestante = [];
    const tentativaRestante = [];
    
    for (let i = 0; i < 4; i++) {
      if (tentativa[i] === codigoSecreto[i]) {
        novoFeedback[i] = 'verde';
      } else {
        codigoRestante.push(codigoSecreto[i]);
        tentativaRestante.push(tentativa[i]);
      }
    }
    
    
    for (let i = 0; i < tentativaRestante.length; i++) {
      const index = codigoRestante.indexOf(tentativaRestante[i]);
      if (index !== -1) {
        for (let j = 0; j < 4; j++) {
          if (novoFeedback[j] === null && tentativa[j] === tentativaRestante[i]) {
            novoFeedback[j] = 'amarelo';
            codigoRestante.splice(index, 1);
            break;
          }
        }
      }
    }
    
    return novoFeedback;
  };

  const confirmar = () => {
    const inicioTentativa = liberados - 4;
    const camposTentativa = numeros.slice(inicioTentativa, liberados);
    const preenchidos = camposTentativa.filter((n) => n.temp === 1);
    
    if (preenchidos.length !== 4) return;

    const tentativa = preenchidos.map((n) => parseInt(n.texto));
    const novoFeedback = calcularFeedback(tentativa);
    
    
    setFeedback(prev => {
      const novo = [...prev];
      for (let i = 0; i < 4; i++) {
        novo[inicioTentativa + i] = novoFeedback[i];
      }
      return novo;
    });

    
    const acertou = novoFeedback.every(f => f === 'verde');
    
    if (acertou) {
      Alert.alert("Parabéns!", "Você acertou o código!", [
        { text: "OK", onPress: reiniciarJogo }
      ]);
      return;
    }

    
    if (liberados < numeros.length) {
      setLiberados((prev) => prev + 4);
    } else {
      Alert.alert("Fim do jogo", `O código era: ${codigoSecreto.join('')}`, [
        { text: "Jogar novamente", onPress: reiniciarJogo }
      ]);
    }

    
    setNumeros((prev) => {
      const copia = [...prev];
      for (let i = inicioTentativa; i < liberados; i++) {
        copia[i] = { ...copia[i], md: 1 };
      }
      return copia;
    });
  };

  useEffect(() => {
    const newOp = numeros.map((_, index) => getCorFundo(index));
    setOp(newOp);
  }, [numeros, liberados, feedback]);

  useEffect(() => {
    const newMud = Array(numeros.length).fill("#191D32");
    const newBord = Array(numeros.length).fill(Dimensions.get("window").width * 0.008);
    const achar = numeros.findIndex(item => 
      item.temp === 0 && 
      item.md === 0 && 
      item.id >= liberados - 4 && 
      item.id < liberados
    );
    if (achar !== -1) {
      newMud[achar] = "#282F44";
      newBord[achar] = Dimensions.get("window").width * 0.017;
    }
    setMud(newMud);
    setBord(newBord);
  }, [numeros, liberados]);

  const clicar = (i) => {
    const newB1 = [...b1];
    const newAut = [...aut];
    newB1[i] = 0;
    newAut[i] = Dimensions.get("window").width * 0.001;
    setB1(newB1);
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
          renderItem={({ item, index }) => (
            <View style={styles.bera}>
              <Pressable
                style={[
                  styles.adv,
                  {
                    borderColor: mud[index],
                    backgroundColor: op[index],
                    borderWidth: Dimensions.get("window").width * 0.008,
                    borderBottomWidth: bord[index],
                  },
                ]}
              >
                <Text style={[styles.texto1, { color: getCorTexto(index) }]}>
                  {item.texto}
                </Text>
              </Pressable>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>

      <View style={styles.botoes}>
        <View style={styles.botoesA}>
          <FlatList
            style={styles.flatlist1}
            data={bot}
            numColumns={3}
            renderItem={({ item, index }) => (
              <View style={styles.bot}>
                <Pressable
                  style={[
                    styles.num,
                    item.type === "delete" && styles.deleteButton,
                    item.type === "confirm" && styles.confirmButton,
                    { top: aut[index], borderBottomWidth: b1[index] },
                  ]}
                  onPress={() => {
                    if (item.type === "delete") {
                      deletar();
                    } else if (item.type === "confirm") {
                      confirmar();
                    } else {
                      pegar(item.id);
                    }
                  }}
                  onPressIn={() => clicar(index)}
                  onPressOut={() => {
                    const newB1 = [...b1];
                    const newAut = [...aut];
                    newB1[index] = Dimensions.get("window").width * 0.015;
                    newAut[index] = 0;
                    setB1(newB1);
                    setAut(newAut);
                  }}
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
    borderColor: "#420000ff",
  },
  confirmButton: {
    backgroundColor: "#006400",
    borderColor: '#002500ff',
  },
  numerosAd: {
    top: "5%",
    flex: 0.53,
    width: "90%",
  },
  adv: {
    height: "100%",
    width: "100%",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  flatlist: {
    width: "100%",
    flex: 1,
    padding: "7%",
    paddingBottom: "15%",
  },
  flatlist1: {
    width: "100%",
    flex: 1,
    padding: "7%",
    paddingBottom: "115%",
    marginBottom: "130%",
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
    borderRadius: 10,
    backgroundColor: "#3C896D",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#214e3eff",
  },
  numText: {
    fontSize: Dimensions.get("window").width * 0.07,
    color: "white",
    fontWeight: "600",
    textAlignVertical: "center",
  },
  texto1: {
    fontSize: Dimensions.get("window").width * 0.07,
    fontWeight: "600",
    textAlignVertical: "center",
    textAlign: "center",
    includeFontPadding: false,
  }
});
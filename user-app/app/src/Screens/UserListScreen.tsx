import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View
} from "react-native";

type Company = {
  name: string,
}

type Address = {
  city: string,
  street: string,
}

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: Address;
  adaddressStreetdress: Address;
  company: Company;
};

const UserListScreen = () => {
  const router = useRouter();

  const [dataUser, setDataUser] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState<string>("");

  const theme = useColorScheme();
  const isDark = theme === "dark";

  const getUsers = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const json = await res.json();
      setDataUser(json);
      // console.log(json);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const filteredUsers = dataUser.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const goToDetails = (user: User) => {
    router.push({
      pathname: "/src/Screens/[id]",
      params: {
        name: user.name,
        email: user.email,
        id: user.id,
        phone: user.phone,
        address: user.address.city,
        addressStreet: user.address.street,
        company: user.company.name,
      },
    });
  };

  const styles = StyleSheet.create({
  generalText: {
    textTransform: 'uppercase',
    color: isDark ? "#FFFFFF" : '#000',
    fontSize: 20,
    fontWeight: 600
  },
  input: {
    height: 40,
    borderColor: isDark ? "#FFFFFF" : "gray",
    borderWidth: 1,
    padding: 8,
    backgroundColor: isDark ? "#3d3d3d" : '#ffffff',
    color: isDark ? "#FFF" : '#000',
  },
  sectionUser: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: isDark ? "#282828" : '#f1f1f1',
    padding: 16,
    marginBottom: 16,
    borderRadius: 16,
  },
  userContent: {
    backgroundColor: '#2686f3',
    borderRadius: 24,
    padding: 8
  },
  userImg: {
    width: 32,
    height: 32,
  },
  nameTitle: {
    textAlign: 'left',
    fontWeight: 600,
    color: isDark ? "#FFF" : '#333333',
    fontSize: 16,
  },
  emailTitle: {
    color: isDark ? "#FFF" : '#333333',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#2686f3',
    borderColor: '#2686f3',
    borderRadius: 16,
    textAlign: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 600,
    fontSize: 12
  }
});

  return (
    <>
      <Text style={styles.generalText}>Directorio de usuarios</Text>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Buscar por nombre"
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <View>
        {isLoading ? (
          <View>
            <Text>Cargando</Text>
          </View>
        ) : (
          <FlatList
            scrollEnabled={false}
            data={filteredUsers}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <>
                <View style={styles.sectionUser}>
                  <View style={styles.userContent}>
                    <Image 
                      style={styles.userImg}
                      source={require('@/assets/images/perfil.png')} 
                    />
                  </View>
                  <View>
                    <Text style={styles.nameTitle}>{item.name}</Text>
                    <Text style={styles.emailTitle}>{item.email}</Text>
                  </View>
                  <TouchableOpacity 
                  onPress={() => goToDetails(item)}
                  style={styles.button}>
                    <Text style={styles.buttonText}>Detalles</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          />
        )}
      </View>
    </>
  );
};

export default UserListScreen;

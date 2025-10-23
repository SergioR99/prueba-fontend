import { StyleSheet, View } from "react-native";
import UserCard from "../Components/UserCard";

export default function UserDetailScreen() {
  // const { id, name, email } = useLocalSearchParams();

  return (
    <View style={styles.content}>
      <UserCard />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    width: '80%',
    marginHorizontal: 'auto',
    marginVertical: 24,
  }
});
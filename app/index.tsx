import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaView } from "react-native-safe-area-context";

import Circles from "./components/circles";

const components: Record<string, React.ComponentType> = {
  circles: Circles,
};

export default function Index() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const [items, setItems] = useState(
    Object.keys(components).map((key) => ({ label: key, value: key })),
  );

  const Selected = value ? components[value] : null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.dropdown}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Select a component"
        />
      </View>
      <View style={styles.content}>{Selected && <Selected />}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  dropdown: { padding: 16, zIndex: 1000 },
  content: { flex: 1, alignItems: "center", justifyContent: "center" },
});

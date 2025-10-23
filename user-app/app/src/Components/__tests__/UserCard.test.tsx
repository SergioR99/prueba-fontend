import { render } from "@testing-library/react-native";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import UserCard from "../UserCard";

jest.mock("expo-router", () => ({
  useLocalSearchParams: jest.fn(),
}));

describe("UserCard", () => {
  it("muestra correctamente los datos del usuario", () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({
      name: "Juan Pérez",
      email: "juan@example.com",
      phone: "123456789",
      address: "Bogotá",
      addressStreet: "Calle 123",
      company: "TechCorp",
    });

    const { getByText } = render(<UserCard />);

    expect(getByText("Nombre: Juan Pérez")).toBeTruthy();
    expect(getByText("Email: juan@example.com")).toBeTruthy();
    expect(getByText("Teléfono: 123456789")).toBeTruthy();
    expect(getByText("Dirección: Bogotá - Calle 123")).toBeTruthy();
    expect(getByText("Empresa: TechCorp")).toBeTruthy();
  });
});
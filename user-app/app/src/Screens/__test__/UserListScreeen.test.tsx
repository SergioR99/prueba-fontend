import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import React from "react";
import UserListScreen from "../UserListScreen";

const mockPush = jest.fn();
jest.mock("expo-router", () => ({
  useRouter: () => ({ push: mockPush }),
}));

beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            id: "1",
            name: "Juan Pérez",
            email: "juan@example.com",
            phone: "123456789",
            address: { city: "Bogotá", street: "Calle 1" },
            company: { name: "Ejemplo S.A." },
          },
          {
            id: "2",
            name: "María López",
            email: "maria@example.com",
            phone: "987654321",
            address: { city: "Medellín", street: "Carrera 7" },
            company: { name: "Empresa X" },
          },
        ]),
    })
  ) as jest.Mock;
});

describe("UserListScreen", () => {
  it("muestra el título del directorio", () => {
    render(<UserListScreen />);
    expect(screen.getByText("Directorio de usuarios")).toBeTruthy();
  });

  it("muestra usuarios después de la carga", async () => {
    render(<UserListScreen />);

    await waitFor(() => {
      expect(screen.getByText("Juan Pérez")).toBeTruthy();
      expect(screen.getByText("María López")).toBeTruthy();
    });
  });

  it("filtra usuarios al escribir en el buscador", async () => {
    render(<UserListScreen />);

    await waitFor(() => {
      expect(screen.getByText("Juan Pérez")).toBeTruthy();
      expect(screen.getByText("María López")).toBeTruthy();
    });

    const input = screen.getByPlaceholderText("Buscar por nombre");

    fireEvent.changeText(input, "Juan");

    await waitFor(() => {
      expect(screen.getByText("Juan Pérez")).toBeTruthy();
      expect(screen.queryByText("María López")).toBeNull();
    });
  });

  it("navega a detalles al presionar el botón", async () => {
    render(<UserListScreen />);

    await waitFor(() => {
      expect(screen.getByText("Juan Pérez")).toBeTruthy();
    });

    const button = screen.getAllByText("Detalles")[0];

    fireEvent.press(button);

    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith({
      pathname: "/src/Screens/[id]",
      params: {
        id: "1",
        name: "Juan Pérez",
        email: "juan@example.com",
        phone: "123456789",
        address: "Bogotá",
        addressStreet: "Calle 1",
        company: "Ejemplo S.A.",
      },
    });
  });
});

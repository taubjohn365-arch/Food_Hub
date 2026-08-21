# FoodHub — Expo + TypeScript Mini Task

A functional food ordering mobile application created for a React Native mini task.

## Features
- Home screen
- Food menu with FlatList
- Search/filter
- Food details with navigation parameters
- Functional cart using React Context
- Quantity controls
- Add Order form
- Form validation
- Order confirmation Modal
- Alert messages
- ActivityIndicator
- ScrollView
- SafeAreaView
- Images
- React Navigation Native Stack
- TypeScript

## Setup

1. Install Node.js LTS.
2. Open this folder in VS Code.
3. Run:

```bash
npm install
```

4. Start Expo:

```bash
npx expo start
```

For a physical phone, install Expo Go and scan the QR code. If your Expo Go version does not support this project's SDK, create/use an SDK version supported by your installed Expo Go client.

## Mini-task requirement mapping

- View/Text/TextInput/Pressable/Image/ScrollView/FlatList/SafeAreaView: used throughout.
- ActivityIndicator: order processing screen.
- Modal: checkout confirmation.
- Alert: validation and successful order messages.
- Navigation: React Navigation Native Stack.
- Four+ screens: Home, Food Menu, Food Details, Add Order, Cart.
- Navigation parameters: Food Menu passes the selected Food object to Food Details.
- State management: React Context + useState.
- User input: search and order form.
- Validation: customer name, address, food, and quantity.

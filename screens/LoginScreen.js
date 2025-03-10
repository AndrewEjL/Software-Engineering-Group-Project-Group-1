import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    console.log('Signing in with:', email, password);
    navigation.navigate('Home');
  };

  const handleSignUp = () => {
    console.log('Navigate to sign up page');
    navigation.navigate('SelectRegistrationRole');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
         behavior={Platform.OS === "ios" ? "padding" : "height"} 
         style={{ flex: 1 }}
         keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // Adjust this value as needed
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer} 
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.loginCard}>
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome Back!</Text>
              <Text style={styles.subtitleText}>Sign in to your account to continue</Text>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, { color: '#000' }]}
                placeholder="Email"
                placeholderTextColor="#9e9e9e"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <TextInput
                style={[styles.input, { color: '#000' }]}
                placeholder="Password"
                placeholderTextColor="#9e9e9e"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
              <Text style={styles.signInButtonText}>Sign in</Text>
            </TouchableOpacity>

            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>New User? </Text>
              <TouchableOpacity onPress={handleSignUp}>
                <Text style={styles.signUpLink}>Sign up!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // White background
  },
  scrollContainer: {
    flexGrow: 1,  // Allows scrolling even when content is small
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: "100%", // Ensures it takes full screen height
    paddingVertical: 20,
  },
  loginCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    alignItems: 'stretch',
    paddingVertical: 30,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 40,
    paddingHorizontal: 10,
    textAlign: 'center',
    color: '#000',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  subtitleText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#F8F8F8',
  },
  signInButton: {
    backgroundColor: '#5E4DCD',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  signInButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signUpText: {
    color: '#000',
    fontSize: 16,
  },
  signUpLink: {
    color: '#5E4DCD',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default LoginScreen;

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // Handle sign in logic here
    console.log('Signing in with:', email, password);
    // Navigation would go here, e.g.: navigation.navigate('Home');
  };

  const handleSignUp = () => {
    // Navigate to sign up page
    // navigation.navigate('SignUp');
    console.log('Navigate to sign up page');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginCard}>
        
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          <Text style={styles.subtitleText}>Sign in to your account to continue</Text>
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input,{color: '#000000'}]}
            placeholder="Email"
            placeholderTextColor="#9e9e9e"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <TextInput
            style={[styles.input,{color: '#000000'}]}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
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
    color: '#333',
    fontSize: 16,
  },
  signUpLink: {
    color: '#5E4DCD',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default LoginScreen;
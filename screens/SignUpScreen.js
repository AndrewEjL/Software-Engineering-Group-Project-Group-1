import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import * as Yup from 'yup';
import { Formik } from 'formik';

const SignUpScreen = ({ navigation }) => {
  const handleSignUp = (values) => {
    Alert.alert('Sign Up Successful', `Welcome, ${values.username}!`);
    navigation.navigate('Login');
  };

  // Simulated existing usernames for validation
  const existingUser_names = ['user1', 'user2', 'user3'];

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .notOneOf(existingUser_names, 'Username already exists'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    phoneNumber: Yup.string()
      .required('Phone number is required')
      .matches(/^\d{10}$/, 'Phone number must be 10 digits'), // Adjust regex as needed
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={100} // Adjust this value as needed
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false} // Optional: Hide scroll indicator
      >
        <View style={styles.card}>
          <Text style={styles.title}>Sign Up</Text>
          <Formik
            initialValues={{ username: '', email: '', password: '', confirmPassword: '', phoneNumber: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSignUp}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <>
                <TextInput
                  placeholder="Username"
                  placeholderTextColor="#9e9e9e"
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                  style={styles.input}
                />
                {errors.username && touched.username && <Text style={styles.error}>{errors.username}</Text>}

                <TextInput
                  placeholder="Email"
                  placeholderTextColor="#9e9e9e"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  style={styles.input}
                />
                {errors.email && touched.email && <Text style={styles.error}>{errors.email}</Text>}

                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#9e9e9e"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry
                  style={styles.input}
                />
                {errors.password && touched.password && <Text style={styles.error}>{errors.password}</Text>}

                <TextInput
                  placeholder="Confirm Password"
                  placeholderTextColor="#9e9e9e"
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  secureTextEntry
                  style={styles.input}
                />
                {errors.confirmPassword && touched.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}

                <TextInput
                  placeholder="Phone Number"
                  placeholderTextColor="#9e9e9e"
                  onChangeText={handleChange('phoneNumber')}
                  onBlur={handleBlur('phoneNumber')}
                  value={values.phoneNumber}
                  style={styles.input}
                />
                {errors.phoneNumber && touched.phoneNumber && <Text style={styles.error}>{errors.phoneNumber}</Text>}

                <TouchableOpacity style={styles.signUpButton} onPress={handleSubmit}>
                  <Text style={styles.signUpButtonText}>Sign Up</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,  // Allows scrolling even when content is small
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: "100%", // Ensures it takes full screen height
    paddingVertical: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    alignItems: 'stretch',
    paddingVertical: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#F8F8F8',
    color: 'black',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  signUpButton: {
    backgroundColor: '#5E4DCD',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SignUpScreen;
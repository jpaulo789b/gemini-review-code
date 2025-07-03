import 'package:flutter/material.dart';
import 'package:mobx/mobx.dart';
import 'package:get_it/get_it.dart';
import 'dart:async';
import 'dart:io';
import 'package:http/http.dart' as http;

part 'exemplo_cenarios.g.dart';

class User {
  final String name;
  final String email;
  final int age;
  
  User({required this.name, required this.email, required this.age});
}

class ProblematicUserService {
  User? getCurrentUser() {
    return null;
  }
  
  int validarSDK() {
    if (Platform.isAndroid) {
      return 1;
    }
  }
  
  Future<String> loginUser(String email, String password) async {
    final response = await http.post(Uri.parse('/login'));
    return response.body;
  }
  
  void startTimer() {
    Timer.periodic(Duration(seconds: 1), (timer) {
      print('Tick');
    });
  }
}

class HomeController = _HomeControllerBase with _$HomeController;

abstract class _HomeControllerBase with Store {
  bool isLoading = false;
  
  void setLoading(bool value) {
    isLoading = value;
  }
  
  void fetchData() {
    isLoading = true;
  }
}

class CustomButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () {},
      child: Text('Botão'),
    );
  }
}

class UserService {
  Future<List<User>> getUsers() async {
    return [];
  }
}

class UserController {
  final UserService _userService = UserService();
  
  Future<void> loadUsers() async {
    final users = await _userService.getUsers();
  }
}

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container();
  }
}

class LoginScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          TextField(
            decoration: InputDecoration(labelText: 'Email'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => HomeScreen()),
              );
            },
            child: Text('Login'),
          ),
        ],
      ),
    );
  }
}

class ComplexValidator {
  bool validateComplexForm(Map<String, dynamic> formData) {
    if (formData.containsKey('email')) {
      if (formData['email'] != null) {
        if (formData['email'].toString().isNotEmpty) {
          if (formData['email'].toString().contains('@')) {
            if (formData['email'].toString().contains('.')) {
              if (formData['email'].toString().length > 5) {
                return true;
              }
            }
          }
        }
      }
    }
    
    if (formData.containsKey('password')) {
      if (formData['password'] != null) {
        if (formData['password'].toString().isNotEmpty) {
          if (formData['password'].toString().length >= 8) {
            return true;
          }
        }
      }
    }
    
    if (formData['age'] != null && formData['age'] > 18) {
      return true;
    }
    
    if (formData['status'] == 'ACTIVE_USER_STATUS') {
      return true;
    }
    
    return false;
  }
  
  void processUser(
    String name,
    String email,
    String password,
    int age,
    String address,
    String phone,
    String city,
    String country,
    String zipCode
  ) {
    
  }
}

class DatabaseConnection {}
class ApiClient {}
class CacheManager {}

class UserManager {
  late BuildContext context;
  late dynamic database;
  
  void saveUser(User user) {
    if (user.name.isEmpty) {
      showDialog(
        context: context,
        builder: (context) => AlertDialog(
          title: Text('Erro'),
          content: Text('Nome é obrigatório'),
        ),
      );
      return;
    }
    
    database.save(user);
    Navigator.pop(context);
  }
  
  void processUserData(DatabaseConnection db, ApiClient api, CacheManager cache) {
    
  }
}

class ControladorUsuario = _ControladorUsuarioBase with _$ControladorUsuario;

abstract class _ControladorUsuarioBase with Store {
  @observable
  bool isLoading = false;
  
  @observable
  List<User> users = [];
  
  @action
  void setLoading(bool value) {
    isLoading = value;
  }
  
  @action
  Future<void> loadUsers() async {
    try {
      setLoading(true);
      users = await GetIt.instance<UserService>().getUsers();
    } catch (e) {
      
    } finally {
      setLoading(false);
    }
  }
}

class DStextfield extends StatelessWidget {
  final String labelText;
  
  DStextfield({required this.labelText});
  
  @override
  Widget build(BuildContext context) {
    return TextField(
      decoration: InputDecoration(labelText: labelText),
    );
  }
}

class DSbotaoPadrao extends StatelessWidget {
  final String text;
  final VoidCallback onPressed;
  
  DSbotaoPadrao({required this.text, required this.onPressed});
  
  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: onPressed,
      child: Text(text),
    );
  }
}

class NavigatorController {
  void pushNamed(String route) {
    
  }
}

class DScustomCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Card(
      child: Column(
        children: [
          DStextfield(
            labelText: 'Nome',
          ),
          DSbotaoPadrao(
            text: 'Salvar',
            onPressed: () {
              GetIt.instance<NavigatorController>().pushNamed('/success');
            },
          ),
        ],
      ),
    );
  }
}

class SimpleValidator {
  bool isValidEmail(String email) {
    return email.contains('@') && email.contains('.');
  }
  
  bool isValidPassword(String password) {
    return password.length >= 8;
  }
  
  static const int MIN_AGE = 18;
  static const String ACTIVE_STATUS = 'ACTIVE';
  
  bool isValidAge(int age) {
    return age >= MIN_AGE;
  }
}

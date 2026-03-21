import 'package:dynamic_color/dynamic_color.dart';
import 'package:flutter/material.dart';

class AppTheme {
  static ThemeData getThemeData(
    ColorScheme colorScheme,
    Brightness brightness,
  ) {
    return ThemeData(
      useMaterial3: true,
      colorScheme: colorScheme,
      appBarTheme: AppBarTheme(
        backgroundColor: colorScheme.primaryContainer,
        elevation: 0,
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: colorScheme.primary,
          foregroundColor: colorScheme.onPrimary,
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: colorScheme.primary,
          side: BorderSide(color: colorScheme.primary),
        ),
      ),
      textButtonTheme: TextButtonThemeData(
        style: TextButton.styleFrom(
          foregroundColor: colorScheme.primary,
        ),
      ),
      floatingActionButtonTheme: FloatingActionButtonThemeData(
        backgroundColor: colorScheme.primary,
        foregroundColor: colorScheme.onPrimary,
      ),
      chipTheme: ChipThemeData(
        backgroundColor: colorScheme.primary,
        labelStyle: TextStyle(color: colorScheme.onPrimary),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: colorScheme.primary,
        focusColor: colorScheme.primary,
      ),
      progressIndicatorTheme: ProgressIndicatorThemeData(
        color: colorScheme.primary,
      ),
    );
  }

  /// Light theme configuration
  static ThemeData lightTheme(Color? dynamicBrandColor) {
    final brandColor = dynamicBrandColor ?? const Color(0xFF6750a4);
    final colorScheme = ColorScheme.fromSeed(
      seedColor: brandColor,
    ).harmonized();

    return getThemeData(colorScheme, Brightness.light);
  }

  /// Dark theme configuration
  static ThemeData darkTheme(Color? dynamicBrandColor) {
    final brandColor = dynamicBrandColor ?? const Color(0xFF6750a4);
    final colorScheme = ColorScheme.fromSeed(
      brightness: Brightness.dark,
      seedColor: brandColor,
    ).harmonized();

    return getThemeData(colorScheme, Brightness.dark);
  }
}

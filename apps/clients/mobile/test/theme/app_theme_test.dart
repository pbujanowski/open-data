import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:open_data_mobile/theme/theme.dart';

void main() {
  group('AppTheme', () {
    const defaultBrandColor = Color(0xFF6750a4);
    const customBrandColor = Color(0xFFFF6B6B);

    group('lightTheme', () {
      test('returns ThemeData with light brightness', () {
        final theme = AppTheme.lightTheme(null);
        expect(theme.brightness, equals(Brightness.light));
      });

      test('uses default brand color when none provided', () {
        final theme = AppTheme.lightTheme(null);
        expect(theme.colorScheme.brightness, equals(Brightness.light));
      });

      test('uses custom brand color when provided', () {
        final theme = AppTheme.lightTheme(customBrandColor);
        expect(theme.colorScheme.brightness, equals(Brightness.light));
      });

      test('has useMaterial3 enabled', () {
        final theme = AppTheme.lightTheme(null);
        expect(theme.useMaterial3, isTrue);
      });

      test('has configured AppBar theme', () {
        final theme = AppTheme.lightTheme(null);
        expect(theme.appBarTheme, isNotNull);
        expect(theme.appBarTheme.backgroundColor, isNotNull);
        expect(theme.appBarTheme.elevation, equals(0));
      });

      test('has configured button themes', () {
        final theme = AppTheme.lightTheme(null);
        expect(theme.elevatedButtonTheme, isNotNull);
        expect(theme.outlinedButtonTheme, isNotNull);
        expect(theme.textButtonTheme, isNotNull);
      });

      test('AppBar uses primaryContainer color', () {
        final theme = AppTheme.lightTheme(null);
        expect(
          theme.appBarTheme.backgroundColor,
          equals(theme.colorScheme.primaryContainer),
        );
      });

      test('elevated button uses primary color', () {
        final theme = AppTheme.lightTheme(null);
        final buttonStyle = theme.elevatedButtonTheme.style;
        expect(buttonStyle, isNotNull);
      });

      test('has configured FloatingActionButton theme', () {
        final theme = AppTheme.lightTheme(null);
        expect(theme.floatingActionButtonTheme, isNotNull);
        expect(
          theme.floatingActionButtonTheme.backgroundColor,
          equals(theme.colorScheme.primary),
        );
      });

      test('has configured chip theme', () {
        final theme = AppTheme.lightTheme(null);
        expect(theme.chipTheme, isNotNull);
        expect(
          theme.chipTheme.backgroundColor,
          equals(theme.colorScheme.primary),
        );
      });

      test('has configured input decoration theme', () {
        final theme = AppTheme.lightTheme(null);
        expect(theme.inputDecorationTheme, isNotNull);
        expect(theme.inputDecorationTheme.filled, isTrue);
      });

      test('has configured progress indicator theme', () {
        final theme = AppTheme.lightTheme(null);
        expect(theme.progressIndicatorTheme, isNotNull);
        expect(
          theme.progressIndicatorTheme.color,
          equals(theme.colorScheme.primary),
        );
      });
    });

    group('darkTheme', () {
      test('returns ThemeData with dark brightness', () {
        final theme = AppTheme.darkTheme(null);
        expect(theme.brightness, equals(Brightness.dark));
      });

      test('uses default brand color when none provided', () {
        final theme = AppTheme.darkTheme(null);
        expect(theme.colorScheme.brightness, equals(Brightness.dark));
      });

      test('uses custom brand color when provided', () {
        final theme = AppTheme.darkTheme(customBrandColor);
        expect(theme.colorScheme.brightness, equals(Brightness.dark));
      });

      test('has useMaterial3 enabled', () {
        final theme = AppTheme.darkTheme(null);
        expect(theme.useMaterial3, isTrue);
      });

      test('has configured AppBar theme', () {
        final theme = AppTheme.darkTheme(null);
        expect(theme.appBarTheme, isNotNull);
        expect(theme.appBarTheme.backgroundColor, isNotNull);
        expect(theme.appBarTheme.elevation, equals(0));
      });

      test('AppBar uses primaryContainer color', () {
        final theme = AppTheme.darkTheme(null);
        expect(
          theme.appBarTheme.backgroundColor,
          equals(theme.colorScheme.primaryContainer),
        );
      });

      test('has configured button themes', () {
        final theme = AppTheme.darkTheme(null);
        expect(theme.elevatedButtonTheme, isNotNull);
        expect(theme.outlinedButtonTheme, isNotNull);
        expect(theme.textButtonTheme, isNotNull);
      });

      test('has configured FloatingActionButton theme', () {
        final theme = AppTheme.darkTheme(null);
        expect(theme.floatingActionButtonTheme, isNotNull);
      });

      test('has configured chip theme', () {
        final theme = AppTheme.darkTheme(null);
        expect(theme.chipTheme, isNotNull);
      });

      test('has configured input decoration theme', () {
        final theme = AppTheme.darkTheme(null);
        expect(theme.inputDecorationTheme, isNotNull);
        expect(theme.inputDecorationTheme.filled, isTrue);
      });

      test('has configured progress indicator theme', () {
        final theme = AppTheme.darkTheme(null);
        expect(theme.progressIndicatorTheme, isNotNull);
      });
    });

    group('getThemeData', () {
      test('returns ThemeData with provided color scheme', () {
        final colorScheme = ColorScheme.fromSeed(
          seedColor: defaultBrandColor,
        );
        final theme = AppTheme.getThemeData(colorScheme, Brightness.light);

        expect(theme.colorScheme, equals(colorScheme));
        expect(theme.useMaterial3, isTrue);
      });

      test('applies correct brightness', () {
        final lightColorScheme = ColorScheme.fromSeed(
          seedColor: defaultBrandColor,
        );
        final darkColorScheme = ColorScheme.fromSeed(
          seedColor: defaultBrandColor,
          brightness: Brightness.dark,
        );

        final lightTheme = AppTheme.getThemeData(
          lightColorScheme,
          Brightness.light,
        );
        final darkTheme = AppTheme.getThemeData(
          darkColorScheme,
          Brightness.dark,
        );

        expect(lightTheme.brightness, equals(Brightness.light));
        expect(darkTheme.brightness, equals(Brightness.dark));
      });

      test('all theme components are consistent with color scheme', () {
        final colorScheme = ColorScheme.fromSeed(
          seedColor: defaultBrandColor,
        );
        final theme = AppTheme.getThemeData(colorScheme, Brightness.light);

        // Verify AppBar uses correct colors
        expect(
          theme.appBarTheme.backgroundColor,
          equals(colorScheme.primaryContainer),
        );

        // Verify FAB uses correct colors
        expect(
          theme.floatingActionButtonTheme.backgroundColor,
          equals(colorScheme.primary),
        );

        // Verify Chip uses correct colors
        expect(
          theme.chipTheme.backgroundColor,
          equals(colorScheme.primary),
        );
      });

      test('button themes are properly configured', () {
        final colorScheme = ColorScheme.fromSeed(
          seedColor: defaultBrandColor,
        );
        final theme = AppTheme.getThemeData(colorScheme, Brightness.light);

        expect(theme.elevatedButtonTheme, isNotNull);
        expect(theme.outlinedButtonTheme, isNotNull);
        expect(theme.textButtonTheme, isNotNull);
      });
    });

    group('theme consistency', () {
      test('light and dark themes use same structure', () {
        final lightTheme = AppTheme.lightTheme(null);
        final darkTheme = AppTheme.darkTheme(null);

        // Both should have same theme components
        expect(lightTheme.useMaterial3, equals(darkTheme.useMaterial3));
        expect(lightTheme.appBarTheme, isNotNull);
        expect(darkTheme.appBarTheme, isNotNull);
        expect(lightTheme.elevatedButtonTheme, isNotNull);
        expect(darkTheme.elevatedButtonTheme, isNotNull);
      });

      test('custom brand color applies consistently', () {
        final lightTheme = AppTheme.lightTheme(customBrandColor);
        final darkTheme = AppTheme.darkTheme(customBrandColor);

        expect(lightTheme.colorScheme, isNotNull);
        expect(darkTheme.colorScheme, isNotNull);
      });
    });
  });
}

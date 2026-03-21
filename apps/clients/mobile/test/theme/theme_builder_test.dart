import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:open_data_mobile/theme/theme.dart';

void main() {
  group('ThemeBuilder', () {
    const customBrandColor = Color(0xFFFF6B6B);

    group('buildLightTheme', () {
      test('returns valid ThemeData', () {
        final theme = ThemeBuilder.buildLightTheme(null);
        expect(theme, isA<ThemeData>());
        expect(theme.brightness, equals(Brightness.light));
      });

      test('uses provided dynamic brand color', () {
        final theme = ThemeBuilder.buildLightTheme(customBrandColor);
        expect(theme, isA<ThemeData>());
      });

      test('handles null dynamic brand color', () {
        final theme = ThemeBuilder.buildLightTheme(null);
        expect(theme, isA<ThemeData>());
      });

      test('produces valid MaterialApp theme', () {
        final theme = ThemeBuilder.buildLightTheme(null);
        expect(theme.useMaterial3, isTrue);
        expect(theme.colorScheme, isNotNull);
      });
    });

    group('buildDarkTheme', () {
      test('returns valid ThemeData', () {
        final theme = ThemeBuilder.buildDarkTheme(null);
        expect(theme, isA<ThemeData>());
        expect(theme.brightness, equals(Brightness.dark));
      });

      test('uses provided dynamic brand color', () {
        final theme = ThemeBuilder.buildDarkTheme(customBrandColor);
        expect(theme, isA<ThemeData>());
      });

      test('handles null dynamic brand color', () {
        final theme = ThemeBuilder.buildDarkTheme(null);
        expect(theme, isA<ThemeData>());
      });

      test('produces valid MaterialApp theme', () {
        final theme = ThemeBuilder.buildDarkTheme(null);
        expect(theme.useMaterial3, isTrue);
        expect(theme.colorScheme, isNotNull);
      });
    });

    group('theme comparison', () {
      test('light and dark themes have different brightness', () {
        final lightTheme = ThemeBuilder.buildLightTheme(null);
        final darkTheme = ThemeBuilder.buildDarkTheme(null);

        expect(lightTheme.brightness, equals(Brightness.light));
        expect(darkTheme.brightness, equals(Brightness.dark));
        expect(lightTheme.brightness, isNot(equals(darkTheme.brightness)));
      });

      test('same color produces different color schemes for light/dark', () {
        final lightTheme = ThemeBuilder.buildLightTheme(customBrandColor);
        final darkTheme = ThemeBuilder.buildDarkTheme(customBrandColor);

        expect(lightTheme.colorScheme.brightness, equals(Brightness.light));
        expect(darkTheme.colorScheme.brightness, equals(Brightness.dark));
      });

      test('both themes are complete and usable', () {
        final lightTheme = ThemeBuilder.buildLightTheme(null);
        final darkTheme = ThemeBuilder.buildDarkTheme(null);

        // Verify essential properties exist
        expect(lightTheme.appBarTheme, isNotNull);
        expect(darkTheme.appBarTheme, isNotNull);
        expect(lightTheme.colorScheme, isNotNull);
        expect(darkTheme.colorScheme, isNotNull);
      });
    });

    group('dynamic color handling', () {
      test('works with various color values', () {
        final colors = [
          const Color(0xFF6750a4),
          const Color(0xFFFF6B6B),
          const Color(0xFF00AA00),
          const Color(0xFFFFAA00),
        ];

        for (final color in colors) {
          final lightTheme = ThemeBuilder.buildLightTheme(color);
          final darkTheme = ThemeBuilder.buildDarkTheme(color);

          expect(lightTheme, isA<ThemeData>());
          expect(darkTheme, isA<ThemeData>());
        }
      });

      test('null color does not cause errors', () {
        expect(
          () => ThemeBuilder.buildLightTheme(null),
          returnsNormally,
        );
        expect(
          () => ThemeBuilder.buildDarkTheme(null),
          returnsNormally,
        );
      });
    });
  });
}

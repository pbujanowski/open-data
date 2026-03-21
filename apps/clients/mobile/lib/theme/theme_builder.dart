import 'package:flutter/material.dart';
import 'package:open_data_mobile/theme/app_theme.dart';

/// Builds theme data with system theme detection and dynamic colors
class ThemeBuilder {
  /// Builds light theme with optional dynamic brand color
  ///
  /// Dynamic colors come from the DynamicColorBuilder widget which
  /// extracts colors from the system (Material You on Android 12+)
  static ThemeData buildLightTheme(Color? dynamicBrandColor) {
    return AppTheme.lightTheme(dynamicBrandColor);
  }

  /// Builds dark theme with optional dynamic brand color
  ///
  /// Dynamic colors come from the DynamicColorBuilder widget which
  /// extracts colors from the system (Material You on Android 12+)
  static ThemeData buildDarkTheme(Color? dynamicBrandColor) {
    return AppTheme.darkTheme(dynamicBrandColor);
  }
}

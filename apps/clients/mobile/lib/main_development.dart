import 'package:open_data_mobile/app/app.dart';
import 'package:open_data_mobile/bootstrap.dart';

Future<void> main() async {
  await bootstrap(() => const App());
}

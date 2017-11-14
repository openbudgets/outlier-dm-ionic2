import { Pipe, PipeTransform } from '@angular/core';
import { LangService } from "../../services/lang-service";

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform {
  constructor(public langService: LangService) {}

  transform(value: string, args: string): any {
    if (!value) return value;

    let translations = {
      'Outlier Detection - Visualization Tool': {
        'en': 'Outlier Detection - Visualization Tool',
        'de': 'Ausreisser-Erkennung - Visualisierungswerkzeug'
      },
      'Dataset Details': {
        'en': 'Dataset Details',
        'de': 'Datensatzdetails'
      },
      'Datasets List': {
        'en': 'Datasets List',
        'de': 'Datensatzliste'
      },
      'Compare Multiple': {
        'en': 'Compare Multiple',
        'de': 'Vergleichen'
      },
      'Go': {
        'en': 'Go',
        'de': 'Akzeptieren'
      },
      'Add New Dataset': {
        'en': 'Add New Dataset',
        'de': 'Neuen Datensatz hinzufugen'
      },
      'New Dataset': {
        'en': 'New Dataset',
        'de': 'Neuer Datensatz'
      },
      'Dataset Name': {
        'en': 'Dataset Name',
        'de': 'Datensatzname'
      },
      'Dataset ID': {
        'en': 'Dataset ID',
        'de': 'Datensatz ID'
      },
      'FactsUri': {
        'en': 'FactsUri',
        'de': 'FactsUri'
      },
      'DamUrl': {
        'en': 'DamUrl',
        'de': 'DamUrl'
      },
      'Advanced Configuration': {
        'en': 'Advanced Configuration',
        'de': 'Erweiterte Konfiguration'
      },
      'Search dataset by name': {
        'en': 'Search dataset by name',
        'de': 'Namenssuche'
      },
      'Add Dataset': {
        'en': 'Add Dataset',
        'de': 'Datensatz hinzufugen'
      },
      'Configuration': {
        'en': 'Configuration',
        'de': 'Konfiguration'
      },
      'Language': {
        'en': 'Language',
        'de': 'Sprache'
      },
      'Related Information': {
        'en': 'Related Information',
        'de': 'Verwandte Informationen'
      },
      'Close': {
        'en': 'Close',
        'de': 'schließen'
      }
    };

    let lang = this.langService.getLang();
    return translations[value][lang];
  }
}
export class CpfValidator {
  static isValid(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return false;
    }

    const calculateDigit = (cpf: string, factor: number): number => {
      let total = 0;
      for (let i = 0; i < cpf.length; i++) {
        total += parseInt(cpf[i]) * factor--;
      }
      const result = total % 11;
      return result < 2 ? 0 : 11 - result;
    };

    const firstDigit = calculateDigit(cpf.substring(0, 9), 10);
    if (firstDigit !== parseInt(cpf[9])) {
      return false;
    }

    const secondDigit = calculateDigit(cpf.substring(0, 10), 11);
    if (secondDigit !== parseInt(cpf[10])) {
      return false;
    }

    return true;
  }
}

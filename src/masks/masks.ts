export function MaskTelefone(telefone: string) {

  if (!telefone) {
    return '';
  }

  

  let formatted = telefone.replace(/\D/g, '');

  if (formatted.length >= 2) {
    formatted = formatted.replace(/^(\d{2})/, '($1) ');
  }

  if (formatted.length >= 3) {
    formatted = formatted.replace(/^(\(\d{2}\))(\d+)/, '$1 $2');
  }

  if (formatted.length >= 9) {
    formatted = formatted.replace(/^(\(\d{2}\) \d{5})(\d+)/, '$1-$2');
  }

  return formatted;

}
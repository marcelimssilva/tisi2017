$('#dtNascimento').datepicker({
    format: 'dd/mm/yyyy',
    language: 'pt-BR'
});
$('#cpf').mask('000.000.000-00', { reverse: true });
$('#dtNascimento').mask('00/00/0000');
$('#telefone').mask('(00)0 0000-0000');
$('#cep').mask('00000-000');

$(document).ready(function(){
  var SPMaskBehavior = function (val) {
    return val.replace(/\D/g, '').length === 11 ? '(00) 0 0000-0000' : '(00)0000-00009';
  },
  spOptions = {
    onKeyPress: function(val, e, field, options) {
        field.mask(SPMaskBehavior.apply({}, arguments), options);
      }
  };

  $('#telefone').mask(SPMaskBehavior, spOptions);
});

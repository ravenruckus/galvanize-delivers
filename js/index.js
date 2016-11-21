(function() {
  'use strict';
  $('.button-collapse').sideNav();

  const $tableHead = $('thead tr');
  const $totalMenu = $('.totalMenu');
  const $tbody = $('tbody');
  const $subTotal = $('#subTotal');
  const arr = [0];
  const $p = $('<p>');
  const $tax = $('#tax');
  const taxArr = [0];
  const $pTax = $('<p>');
  const $total = $('#total');
  const $pTotal = $('<p>');
  const totalArr = [0];
  const round = function(value, decimals) {
    return Number(Math.round(+value + 'e' + decimals) + 'e-' + decimals);
  };

  $tableHead.addClass('hide');
  $totalMenu.addClass('hide');

  $('.menu').on('click', 'a', (event) => {
    $tableHead.removeClass('hide');
    $totalMenu.removeClass('hide');
    event.preventDefault();
    const $tr = $('<tr>');
    const $td = $('<td>');
    const $tdPrice = $('<td>');
    const $target = $(event.target);
    const orderId = parseInt($target.attr('id'));
    const food = $('p').filter('.food');
    const price = $('p').filter('.price');
    const targetFood = food[orderId].textContent;
    const targetPrice = price[orderId].textContent;
    const targetPriceRaw = parseFloat(targetPrice.slice(1));

    $td.appendTo($tr).text(targetFood);
    $tdPrice.appendTo($tr).text(targetPrice);
    $tbody.append($tr);

    arr[0] += targetPriceRaw;
    $p.text('$' + round(arr[0], 2));
    $subTotal.append($p);
    taxArr[0] = arr[0] * 0.065;
    $pTax.text('$' + round(taxArr[0], 2));
    $tax.append($pTax);
    totalArr[0] = arr[0] + taxArr[0];
    $pTotal.text('$' + round(totalArr[0], 2));
    $total.append($pTotal);
  });
  const $name = $('input[id=Name]');
  const $phone = $('input[type=tel]');
  const $address = $('input[id=icon_business]');

  $('button[type="submit"]').click((event) => {
    event.preventDefault();
    if (totalArr[0] === 0) {
      Materialize.toast('Please make a selection.', 4000);
      return;
    }
    if (!$name.val()) {
      Materialize.toast('Please enter your name.', 4000);
      return;
    }
    if (!$phone.val()) {
      Materialize.toast('Please enter your phone number.', 4000);
      return;
    }
    if (!$address.val()) {
      Materialize.toast('Please enter your address.', 4000);
      return;
    }
    Materialize.toast('Thank you for your order.', 4000);
  });
})();

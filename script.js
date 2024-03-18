$(document).ready(function() {
    const inventoryItems = [];

    function checkIfExists(item, inventoryItems) {
        return inventoryItems.includes(item);
    }

    $('#inputForm').submit(function(e) {
        e.preventDefault();

        const item = $('#item').val();

        const quantity = $('#quantity').val();

        if (item.length === 0 || quantity.length === 0) {
            alert('Fill out the form first');
            return;
        }

        if (checkIfExists(item, inventoryItems)) {
            alert('Item already taken');
            return;
        }

        inventoryItems.push(item);

        const trElement = $('<tr>');

        const tdElementForItemName = $('<td>').text(item);

        const tdElementForQty = $('<td>').text(quantity).addClass('editable');

        trElement.append(tdElementForItemName, tdElementForQty);

        $('.tablesSection table tbody').append(trElement);
    });

    $('#checkbox').change(function() {
        const isChecked = $(this).is(':checked');
        $('.tablesSection').toggle(isChecked);
    });

    $(document).on('click', '.editable', function() {
        const oldValue = $(this).text();
        const inputField = $('<input type="text" class="form-control">').val(oldValue).addClass('quantityInput');
        $(this).empty().append(inputField);
        inputField.focus();
    
        inputField.keypress(function(event) {
            if (event.which === 13) {
                inputField.blur(); 
            }
        });
    });
    
    $(document).on('blur', '.quantityInput', function() {
        const newValue = $(this).val();
        $(this).parent().text(newValue);
    });
    
    
});

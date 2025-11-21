function closeModal() {
    let modal = document.getElementById('contactModal');
    let overlay = document.getElementById('modalOverlay'); 
    
    if (modal) {
        modal.style.display = 'none';
    }
    if (overlay) {
        overlay.style.display = 'none';
    }
}
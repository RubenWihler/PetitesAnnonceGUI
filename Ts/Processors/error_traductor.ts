class ErrorTraductor{
    static readonly traductions: Map<string,string> = new Map([
        ['email.already.used', 'Cet email est déjà utilisé'],
        ['email.invalid', 'Cet email n\'est pas valide'],
        ['password.too.short', 'Le mot de passe doit contenir au moins 5 caractères'],
    
        ['invalid.credentials', 'le mot de passe ou l\'email est incorrect'],
        ['invalid.token', 'Une erreur de connexion est survenue ! Veuillez vous reconnecter.'],
        ['title.min.2.char', 'Le titre doit contenir au moins 2 caractères'],
        ['amount.cannot.be.negative', 'Le montant ne peut pas être négatif'],        
    ]);
    static traduce(error: string): string{
        if (!this.traductions.has(error)) return error;
        return this.traductions.get(error);
    }
}
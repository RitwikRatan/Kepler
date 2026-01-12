
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, classification_report
import joblib

def train_model():
    # Load dataset
    df = pd.read_csv('dataset.csv')
    
    # Preprocessing
    # Drop Name as it's not a feature
    X = df.drop(['Name', 'Habitability_Class'], axis=1)
    y = df['Habitability_Class']
    
    # Clean string data
    # Convert 'Type', 'Atmosphere_Type' to numeric using Label Encoding
    le_type = LabelEncoder()
    X['Type'] = le_type.fit_transform(X['Type'])
    
    le_atmos = LabelEncoder()
    X['Atmosphere_Type'] = X['Atmosphere_Type'].fillna('Unknown')
    X['Atmosphere_Type'] = le_atmos.fit_transform(X['Atmosphere_Type'])
    
    # Handle missing values if any
    X = X.fillna(X.mean())

    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Scale features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Train multiple models
    models = {
        "Logistic Regression": LogisticRegression(),
        "Random Forest": RandomForestClassifier(n_estimators=100),
        "SVM": SVC(probability=True)
    }
    
    best_model = None
    best_accuracy = 0
    best_name = ""
    
    print("Training Results:")
    for name, model in models.items():
        model.fit(X_train_scaled, y_train)
        preds = model.predict(X_test_scaled)
        acc = accuracy_score(y_test, preds)
        print(f"{name} Accuracy: {acc:.4f}")
        
        if acc > best_accuracy:
            best_accuracy = acc
            best_model = model
            best_name = name
            
    print(f"\nBest Model: {best_name}")
    
    # Save artifacts
    joblib.dump(best_model, 'habitability_model.pkl')
    joblib.dump(scaler, 'scaler.pkl')
    joblib.dump(le_type, 'le_type.pkl')
    joblib.dump(le_atmos, 'le_atmos.pkl')
    
    print("Model and artifacts saved.")

if __name__ == "__main__":
    train_model()

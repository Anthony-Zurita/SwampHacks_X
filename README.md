# **Visual Voice Project Documentation**

Team Members: Jorge Ramirez, Leonardo Cobaleda, Andrei Ursu, & Anthony Zurita (Respectively below)

## **1. Overview**
**Visual Voice** is an innovative project designed to teach people **American Sign Language (ASL)**. The AI model at the core of this project uses the camera of a device to detect hand signs and provide real-time feedback on whether the user is correctly performing ASL gestures.
<div style="display: flex; flex-wrap: wrap; gap: 10px;">
  <img src="https://github.com/user-attachments/assets/8066bf6f-ddd4-4e99-8f3a-938cf0c39ae1" alt="Image 1" width="350", height="300">
  <img src="https://github.com/user-attachments/assets/7b75a8f4-50c9-4be4-ae99-28f50d5adbfd" alt="Image 3" width="400", height="300">
  <img src="https://github.com/user-attachments/assets/fe0ec6c8-1b39-41c2-b9a9-4306062d41c8" alt="Image 4" width="200", height="300">
</div>

## **2. AI Model Creation (Main Branch)**

### **Data Collection with Leap Motion**
To train our AI model, we used the **Leap Motion Controller** to collect precise hand movement data. The data was captured using **LeapC**, a C-language API provided by Leap Motion. LeapC allowed us to extract detailed positional information of various hand components, including:


<div style="display: flex; justify-content: space-around; align-items: center; gap: 10px;">
  <img src="https://github.com/user-attachments/assets/91841be6-0fab-4bf9-a7bb-141ab86c4111" alt="Leap Motion" width="300", height="300">
  <img src="https://github.com/user-attachments/assets/a16ec300-e954-4bb0-83cd-e4b7ef77b751" alt="Project Image" width="300", height="300">
  <img src="https://github.com/user-attachments/assets/2ce8a4aa-5bfa-4649-aa02-1e1929f0bfc8" alt="Hand Image" width="300", height="300">
</div>

- **Palm**:
  - Position and velocity
  - Direction and normal vectors
  - Orthonormal basis
- **Fingers**:
  - Tip position and velocity
  - Direction vector
  - Orthonormal basis
  - Length and width
- **Bones**:
  - Joint positions
  - Orthonormal basis
  - Length and width
- **Arm**:
  - Wrist and elbow positions
  - Direction vector
  - Orthonormal basis
  - Length and width

We focused on collecting data for specific ASL signs, ensuring high accuracy and relevance for teaching ASL.

### **Data Processing**
The positional data gathered from LeapC was processed into a **CSV file** for training. Each dataset entry consisted of:
- Finger joint positions
- Metacarpal and bone coordinates
- Palm orientation
- Corresponding ASL sign labels

This structured dataset was paired with images to enhance the AI model's ability to interpret and classify hand signs.

### **Model Training**
We trained the AI model using **Jupyter Notebook** and **Scikit-learn**. Key steps included:
1. **Preprocessing**: Normalizing the positional data for consistency.
2. **Feature Extraction**: Using finger positions, palm orientation, and bone lengths as features.
3. **Training**: Applying supervised learning techniques to map the input data to ASL signs.

The model was tested extensively to ensure its capability to accurately interpret ASL gestures in real time.

## **Demo Video**

https://github.com/user-attachments/assets/26c868f5-9609-469c-ab99-e3c65769b494

---
## **3. Website (Master Branch)**

### **Technology Stack**
The **Visual Voice** website resides on the **master branch** and serves as the primary interface for users to interact with the AI model. The technologies used include:

- **React**: For building dynamic and interactive user interfaces.
- **JavaScript** and **Bootstrap**: For styling and functionality.
- **Auth0**: For secure user authentication.
- **WebRTC**: For enabling real-time communication and interaction.

### **Core Features**
1. **Authentication**:
   - We implemented **Auth0** to handle user login and authentication securely.
   - Auth0's unique user IDs allowed us to manage participants effectively and facilitate personalized experiences.

2. **Real-Time Video Analysis**:
   - The AI model analyzes the video stream in real-time to interpret the hand signs being performed.

3. **ASL Feedback System**:
   - The AI model provides real-time feedback, guiding users to improve their ASL signing accuracy.

4. **Calling and Sharing Features**:
   - Users can invite others to join calls using unique Auth0 user IDs.
   - Through WebRTC, participants can share video and audio, making it easy to practice ASL together.

---

## **4. How It Works**
1. **Setup**:
   - Users log into the app using their Auth0 credentials.
   - They allow access to their camera for real-time video analysis.

2. **ASL Practice**:
   - Users perform ASL signs in front of their camera.
   - The AI model analyzes the video feed and provides instant feedback on their gestures.

3. **Collaboration**:
   - Users can invite friends or other participants to practice ASL together via video calls.
   - Real-time audio and video streams are enabled using WebRTC.
     
---

## **7. References**
- [Leap Motion API Documentation](https://docs.ultraleap.com/api-reference/tracking-api/leapc-guide.html)
- [Scikit-learn Documentation](https://scikit-learn.org/stable/)
- [Auth0 Authentication](https://auth0.com/)
- [WebRTC Introduction](https://webrtc.org/)

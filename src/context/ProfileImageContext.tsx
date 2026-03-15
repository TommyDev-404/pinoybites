
import { createContext, useContext, useState, useEffect } from "react";

interface ProfileImageContextType {
      profileImage: string;
      handleSetProfileImage: (profileImage: string) => void;
}

const ProfileImageContext = createContext<ProfileImageContextType | undefined>(undefined);

export const ProfileImageProvider = ({ children }: { children: React.ReactNode }) => {
      const [ profileImage, setProfileImage ] = useState<string>('');

      // Load profile image from localStorage on mount
      useEffect(() => {
            const storedProfileImage = localStorage.getItem("profileImage");
            if (storedProfileImage) setProfileImage(storedProfileImage);
      }, []);

      const handleSetProfileImage = (image: string) => {
            localStorage.setItem('profileImage', image);
            setProfileImage(image);
      };

      return (
            <ProfileImageContext.Provider value={{ profileImage, handleSetProfileImage }}>
                  {children}
            </ProfileImageContext.Provider>
      );
};

export const useProfile = () => {
      const context = useContext(ProfileImageContext);
      if (!context) throw new Error("useAuth must be used within ProfileImageProvider");
      return context;
};
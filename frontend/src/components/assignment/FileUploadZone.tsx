import { useRef, useState } from "react";
import { Cloud, Loader2 } from "lucide-react";
import { uploadFile } from "@/services/api.service";
import { toast } from "sonner";
import { AssignmentFormData } from "@/store/assessmentStore";

interface FileUploadZoneProps {
  formData: AssignmentFormData;
  setFormData: (data: Partial<AssignmentFormData>) => void;
}

export function FileUploadZone({ formData, setFormData }: FileUploadZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const res = await uploadFile(file);
      setFormData({ uploadedFileText: res.path });
      toast.success("File uploaded successfully");
    } catch (err: any) {
      toast.error(err.message || "Failed to upload file");
    } finally {
      e.target.value = "";
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="w-full h-[202px] bg-white border-[1.75px] border-dashed rounded-[24px] flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-black transition"
        style={{ borderColor: 'rgba(0, 0, 0, 0.2)' }}
      >
        <input 
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="image/*,application/pdf"
          className="hidden"
        />
        
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-[#EBEBEB]">
          {uploading ? (
            <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
          ) : (
            <Cloud className="w-6 h-6" style={{ color: '#1E1E1E' }} />
          )}
        </div>

        <div className="flex flex-col items-center gap-[4px]">
          <span style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 500, fontSize: '16px', color: '#303030', letterSpacing: '-0.04em' }}>
            {formData.uploadedFileText ? `Selected file: ${formData.uploadedFileText.split('/').pop()}` : "Choose a file or drag & drop it here"}
          </span>
          <span style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 400, fontSize: '14px', color: '#A9A9A9', letterSpacing: '-0.04em' }}>
            JPEG, PNG, upto 10MB
          </span>
        </div>

        <button type="button" className="h-9 px-6 rounded-full text-[14px] font-medium" style={{ background: '#F6F6F6', color: '#303030', fontFamily: 'var(--font-bricolage)', letterSpacing: '-0.04em' }}>
          Select File
        </button>
      </div>
      <span className="text-[16px] font-medium" style={{ fontFamily: 'var(--font-bricolage)', color: 'rgba(48, 48, 48, 0.6)', letterSpacing: '-0.04em' }}>
        Upload images of your preferred document/image
      </span>
    </div>
  );
}

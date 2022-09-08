package sevice.app.trasfer;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import sevice.app.models.Text;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchDto {
    Long floorId;
    Text text;

    public static SearchDto from(Long floorId, Text text) {
        return SearchDto.builder()
                .floorId(floorId)
                .text(text)
                .build();
    }
}
